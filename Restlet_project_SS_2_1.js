/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record'], (record) => {    
    
      const post_ = (request) => {

        if(request) {
           
       class Transaction {
         constructor(request) {
            this.request = request; 
        }

         createRecord() {
           const rec =  record.create({type: request.type, isDynamic: true });
           rec.setValue({fieldId: 'entity', value: request.customer.id});
           rec.selectLine({sublistId: 'item', line: 0});
           rec.setCurrentSublistValue({sublistId: 'item',fieldId: 'item', value: request.items[0].item});
           rec.commitLine({sublistId: 'item'});
           
           if(request.type === 'salesorder'){
           rec.setValue({fieldId: 'memo', value: request.memo});

           }

          if(request.type === 'invoice'){
           rec.setValue({fieldId: 'location', value: request.location});
           rec.setValue({fieldId: 'memo', value: request.memo});
           rec.setValue({fieldId: 'custbodyshipment_number', value: request.shipment_number});
           }

            rec.save();
         }

       }

           class SalesOrder extends Transaction {
        constructor(request) {
          super(request); 
           }
       } 

        class Invoice extends Transaction {
        constructor (request) {
          super (request);
           }
       
      }
         
          if(request.type === 'salesorder') { 
            let salesOrder = new SalesOrder(request);
            salesOrder.createRecord();
            }  else if(request.type === 'invoice'){
                 let invoice = new Invoice(request);
                 invoice.createRecord();
            }
      
   }  else return `Please review the request body. The call to the Restlet was made without a JSON body`; 

}
    return {
      post: post_
    }  
});