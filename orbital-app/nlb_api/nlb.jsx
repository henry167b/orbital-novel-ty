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
      if (items[i].childNodes[7].textContent == 'Not on Loan') {
         locations[locations.length] = (items[i].childNodes[2].textContent);
      }
   }
   return locations;
}
