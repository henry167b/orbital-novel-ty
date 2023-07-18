import axios from "axios";
import { DOMParser } from "xmldom";

// usage of module
export async function getAvailability(ISBN) {
   const url = 'https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?singleWsdl';
   const API_KEY = 'RGV2LUlibnU6UEBzc3cwcmQyMDIz';
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">
      <soapenv:Header/>
      <soapenv:Body>
         <cat:GetAvailabilityInfoRequest>
            <cat:APIKey>` + API_KEY + `</cat:APIKey>
            <cat:BID></cat:BID>
            <cat:ISBN>` + ISBN + `</cat:ISBN>
            <cat:Modifiers>
            </cat:Modifiers>
         </cat:GetAvailabilityInfoRequest>
      </soapenv:Body>
      </soapenv:Envelope>`;

   const res = await axios.post(
      url,
      xml,
      { // httpsAgent: new https.Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }),
      headers: {
         'Content-Type': 'text/xml; charset=utf-8',
         'SOAPAction': 'http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/GetAvailabilityInfo'
         }
      })

   const doc = new DOMParser().parseFromString(res.data, 'text/xml');
   const items = doc.getElementsByTagName("Item");
   let locations = [];

   for (let i = 0; i <items.length; i++) {
      if (items[i].getElementsByTagName('StatusDesc')[0].textContent == 'Not on Loan') {
         locations.push(items[i].getElementsByTagName('BranchName')[0].textContent);
      }
   }
   return locations;
}

export async function getTitleDetails(BID, ISBN) {
   const url = 'https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?singleWsdl';
   const API_KEY = 'RGV2LUlibnU6UEBzc3cwcmQyMDIz';
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">
   <soapenv:Header/>
      <soapenv:Body>
         <cat:GetTitleDetailsRequest>
            <cat:APIKey>` + API_KEY + `</cat:APIKey>
            <cat:BID>` + BID + `</cat:BID>
            <cat:ISBN>` + ISBN + `</cat:ISBN>
         </cat:GetTitleDetailsRequest>
      </soapenv:Body>
   </soapenv:Envelope>`;

   const res = await axios.post(
      url,
      xml,
      { // httpsAgent: new https.Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }),
      headers: {
         'Content-Type': 'text/xml; charset=utf-8',
         'SOAPAction': 'http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/GetTitleDetails'
         }
      })

   const doc = new DOMParser().parseFromString(res.data, 'text/xml');
   let books = [];

   const book = {
      title: doc.getElementsByTagName('TitleName')[0].textContent,
      author: doc.getElementsByTagName('Author')[0].textContent,
      isbn: doc.getElementsByTagName('ISBN')[0].textContent.split(' ')[0],
      bid: doc.getElementsByTagName('BID')[0].textContent,
      publishyear: ''
   };
   books.push(book);
   return books;
}

export async function search(query) {
   const url = 'https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?singleWsdl';
   const API_KEY = 'RGV2LUlibnU6UEBzc3cwcmQyMDIz';
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">
   <soapenv:Header/>
   <soapenv:Body>
      <cat:SearchRequest>
         <cat:APIKey>` + API_KEY + `</cat:APIKey>
         <cat:SearchItems>
            <cat:SearchItem>
               <cat:SearchField>Keywords</cat:SearchField>
               <cat:SearchTerms>` + query + `</cat:SearchTerms>
            </cat:SearchItem>
         </cat:SearchItems>
         <cat:Modifiers>
            <cat:SortSchema>TITLE</cat:SortSchema>
            <cat:StartRecordPosition>1</cat:StartRecordPosition>
            <cat:MaximumRecords>20</cat:MaximumRecords>
            <cat:SetId></cat:SetId>
         </cat:Modifiers>
      </cat:SearchRequest>
      </soapenv:Body>
      </soapenv:Envelope>`;

   try{
      const res = await axios.post(
         url,
         xml,
         { // httpsAgent: new https.Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }),
         headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/Search'
            }
         })
      const doc = new DOMParser().parseFromString(res.data, 'text/xml');
      const items = doc.getElementsByTagName('Title');
      let books = [];
  
      for (let i = 0; i < items.length; i++) {
        const book = {
          title: items[i].getElementsByTagName('TitleName')[0].textContent,
          author: items[i].getElementsByTagName('Author')[0].textContent,
          isbn: items[i].getElementsByTagName('ISBN')[0].textContent.split(' ')[0],
          bid: items[i].getElementsByTagName('BID')[0].textContent,
          publishyear: items[i].getElementsByTagName('PublishYear')[0].textContent
        };
  
        books.push(book);
      }
      return books;

   } catch (error) {
   console.log(error);
   return [];
   }  
}

export async function getSummary(ISBN) {
   const url = 'https://openweb.nlb.gov.sg/OWS/CatalogueService.svc?singleWsdl';
   const API_KEY = 'RGV2LUlibnU6UEBzc3cwcmQyMDIz';
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cat="http://www.nlb.gov.sg/ws/CatalogueService">
   <soapenv:Header/>
      <soapenv:Body>
         <cat:GetTitleDetailsRequest>
            <cat:APIKey>` + API_KEY + `</cat:APIKey>
            <cat:ISBN>` + ISBN + `</cat:ISBN>
         </cat:GetTitleDetailsRequest>
      </soapenv:Body>
   </soapenv:Envelope>`;

   const res = await axios.post(
      url,
      xml,
      { // httpsAgent: new https.Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }),
      headers: {
         'Content-Type': 'text/xml; charset=utf-8',
         'SOAPAction': 'http://www.nlb.gov.sg/ws/CatalogueService/ICatalogueService/GetTitleDetails'
         }
      })

   const doc = new DOMParser().parseFromString(res.data, 'text/xml');
   let summary = doc.getElementsByTagName('Summary')[0].textContent;
   if (summary == '') summary = 'No summary provided';
   let notes = doc.getElementsByTagName('Notes')[0].textContent;
   if (notes == '') notes = 'No notes provided';
   return [summary, notes];
}