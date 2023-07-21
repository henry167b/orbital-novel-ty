import * as api from "../nlb_api/nlb";
import axios from "axios";

describe("SOAP API Tests", () => {
  //  Test for availability
  it("should fetch availibility successfully", async () => {
    const mockResponse = `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <GetAvailabilityInfoResponse xmlns="http://www.nlb.gov.sg/ws/CatalogueService">
            <Status>OK</Status>
            <Message>Operation completed successfully</Message>
            <ErrorMessage/>
            <NextRecordPosition>0</NextRecordPosition>
            <SetId>484251788</SetId>
            <Items>
              <Item>
                  <ItemNo>B37134068J</ItemNo>
                  <BranchID>WRL</BranchID>
                  <BranchName>Woodlands Regional Library</BranchName>
                  <LocationCode>____</LocationCode>
                  <LocationDesc>Adult Lending</LocationDesc>
                  <CallNumber>English BUR</CallNumber>
                  <StatusCode>S</StatusCode>
                  <StatusDesc>Not on Loan</StatusDesc>
                  <MediaCode>BOOK</MediaCode>
                  <MediaDesc>Book</MediaDesc>
                  <StatusDate>22/03/2023</StatusDate>
                  <DueDate/>
                  <ClusterName/>
                  <CategoryName/>
                  <CollectionCode>GGEN</CollectionCode>
                  <CollectionMinAgeLimit/>
              </Item>
            </Items>
        </GetAvailabilityInfoResponse>
      </s:Body>
    </s:Envelope>`;

    // Mocking the axios.post method to return a resolved Promise with the mockResponse
    axios.post.mockResolvedValue({ data: mockResponse });

    const query = "9780241951446";
    const locations = await api.getAvailability(query);

    expect(locations).toHaveLength(1);
    expect(locations[0]).toBe("Woodlands Regional Library");
  });

  // Test for the search function
  it("should get title details successfully", async () => {
    const mockResponse = `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <GetTitleDetailsResponse xmlns="http://www.nlb.gov.sg/ws/CatalogueService">
            <Status>OK</Status>
            <Message>Operation completed successfully</Message>
            <ErrorMessage/>
            <TitleDetail>
              <BID>9619492</BID>
              <TitleName>A clockwork orange / Anthony Burgess.</TitleName>
              <Author>Burgess, Anthony,</Author>
              <OtherAuthors>Burgess, Anthony, 1917-</OtherAuthors>
              <Publisher/>
              <PhysicalDesc>x, 52, [40] pages:music;20 cm</PhysicalDesc>
              <Subjects/>
              <Summary/>
              <Notes>A play with music based on his novella of the same name. First published: [London] : Hutchinson, 1987.</Notes>
              <ISBN>0413735907 (paperback)</ISBN>
              <ISSN/>
              <NTitleName/>
              <NAuthor/>
              <NPublisher/>
            </TitleDetail>
        </GetTitleDetailsResponse>
      </s:Body>
    </s:Envelope>`;

    // Mocking the axios.post method to return a resolved Promise with the mockResponse
    axios.post.mockResolvedValue({ data: mockResponse });

    const query = "9619492";
    const books = await api.getTitleDetails(query, '');

    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("A clockwork orange / Anthony Burgess.");
    expect(books[0].author).toBe("Burgess, Anthony,");
    expect(books[0].isbn).toBe("0413735907");
    expect(books[0].bid).toBe("9619492");
  });

  it("should fetch search results successfully", async () => {
    const mockResponse = `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
        <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <SearchResponse xmlns="http://www.nlb.gov.sg/ws/CatalogueService">
            <Status>OK</Status>
            <Message>Operation completed successfully</Message>
            <ErrorMessage/>
            <TotalRecords>2</TotalRecords>
            <NextRecordPosition>0</NextRecordPosition>
            <SetId>484249320</SetId>
            <Titles>
                <Title>
                    <BID>201341530</BID>
                    <ISBN>9789814677776 (paperback)|9814677779 (paperback)</ISBN>
                    <TitleName>Lee Kuan Yew : blazing the freedom trail / Anthony Oei.</TitleName>
                    <Author>Oei, Anthony</Author>
                    <PublishYear>2015</PublishYear>
                    <MediaCode>BK</MediaCode>
                    <MediaDesc>Books</MediaDesc>
                </Title>
                <Title>
                    <BID>204494905</BID>
                    <ISBN>9789814677875 (electronic bk)</ISBN>
                    <TitleName>Lee Kuan Yew : blazing the freedom trail / Anthony Oei.</TitleName>
                    <Author>Oei, Anthony</Author>
                    <PublishYear>2020</PublishYear>
                    <MediaCode>BK</MediaCode>
                    <MediaDesc>Books</MediaDesc>
                </Title>
            </Titles>
        </SearchResponse>
        </s:Body>
    </s:Envelope>`;

    // Mocking the axios.post method to return a resolved Promise with the mockResponse
    axios.post.mockResolvedValue({ data: mockResponse });

    const query = "Lee Kuan Yew blazing";
    const books = await api.search(query);

    expect(books).toHaveLength(2);
    expect(books[0].title).toBe(
      "Lee Kuan Yew : blazing the freedom trail / Anthony Oei."
    );
    expect(books[0].author).toBe("Oei, Anthony");
    expect(books[0].isbn).toBe("9789814677776");
    expect(books[0].bid).toBe("201341530");
  });


  // Test for the getSummary function
  it("should fetch book summary and notes successfully", async () => {
    const mockResponse = `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
       <GetTitleDetailsResponse xmlns="http://www.nlb.gov.sg/ws/CatalogueService">
          <Status>OK</Status>
          <Message>Operation completed successfully</Message>
          <ErrorMessage/>
          <TitleDetail>
             <BID>9619492</BID>
             <TitleName>A clockwork orange / Anthony Burgess.</TitleName>
             <Author>Burgess, Anthony,</Author>
             <OtherAuthors>Burgess, Anthony, 1917-</OtherAuthors>
             <Publisher/>
             <PhysicalDesc>x, 52, [40] pages:music;20 cm</PhysicalDesc>
             <Subjects/>
             <Summary/>
             <Notes>A play with music based on his novella of the same name. First published: [London] : Hutchinson, 1987.</Notes>
             <ISBN>0413735907 (paperback)</ISBN>
             <ISSN/>
             <NTitleName/>
             <NAuthor/>
             <NPublisher/>
          </TitleDetail>
       </GetTitleDetailsResponse>
    </s:Body>
 </s:Envelope>`;

    // Mocking the axios.post method to return a resolved Promise with the mockResponse
    axios.post.mockResolvedValue({ data: mockResponse });

    const ISBN = "0413735907";
    const [summary, notes] = await api.getSummary(ISBN);

    expect(summary).toBe("No summary provided");
    expect(notes).toBe(
      "A play with music based on his novella of the same name. First published: [London] : Hutchinson, 1987."
    );
  });
});
