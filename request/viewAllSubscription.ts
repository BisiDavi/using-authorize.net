const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;

export default function viewAllSubscription(res: any) {
  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY
  );

  const sorting = new ApiContracts.ARBGetSubscriptionListSorting();
  sorting.setOrderDescending(true);
  sorting.setOrderBy(
    ApiContracts.ARBGetSubscriptionListOrderFieldEnum.CREATETIMESTAMPUTC
  );

  const paging = new ApiContracts.Paging();
  paging.setOffset(1);
  paging.setLimit(100);

  const listRequest = new ApiContracts.ARBGetSubscriptionListRequest();

  listRequest.setMerchantAuthentication(merchantAuthenticationType);

  listRequest.setSearchType(
    ApiContracts.ARBGetSubscriptionListSearchTypeEnum.SUBSCRIPTIONACTIVE
  );
  listRequest.setSorting(sorting);
  listRequest.setPaging(paging);

  console.log(JSON.stringify(listRequest.getJSON(), null, 2));

  const ctrl = new ApiControllers.ARBGetSubscriptionListController(
    listRequest.getJSON()
  );

  ctrl.execute(function () {
    const apiResponse = ctrl.getResponse();

    const response = new ApiContracts.ARBGetSubscriptionListResponse(
      apiResponse
    );

    console.log(JSON.stringify(response, null, 2));

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
        ApiContracts.MessageTypeEnum.OK
      ) {
        console.log("Total Results: " + response.getTotalNumInResultSet());
        console.log("List of Subscription IDs: ");
        const subscriptions = response
          .getSubscriptionDetails()
          .getSubscriptionDetail();
        for (let i = 0; i < subscriptions.length; i++) {
          console.log(subscriptions[i].getId());
        }
        console.log(
          "Message Code: " + response.getMessages().getMessage()[0].getCode()
        );
        console.log(
          "Message Text: " + response.getMessages().getMessage()[0].getText()
        );
      } else {
        console.log("Result Code: " + response.getMessages().getResultCode());
        console.log(
          "Error Code: " + response.getMessages().getMessage()[0].getCode()
        );
        console.log(
          "Error message: " + response.getMessages().getMessage()[0].getText()
        );
      }
    } else {
      console.log("Null Response.");
    }

    res.status(200).send(response);
  });
}
