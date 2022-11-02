const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;
import { v4 as uuidv4 } from "uuid";

export default function createSubscription(callback: (response:any) => void) {
  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY
  );

  const interval = new ApiContracts.PaymentScheduleType.Interval();
  interval.setLength(1);
  interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

  const paymentScheduleType = new ApiContracts.PaymentScheduleType();
  paymentScheduleType.setInterval(interval);
  paymentScheduleType.setStartDate(utils.getDate());
  paymentScheduleType.setTotalOccurrences(5);
  paymentScheduleType.setTrialOccurrences(0);

  const creditCard = new ApiContracts.CreditCardType();
  creditCard.setExpirationDate("2038-12");
  creditCard.setCardNumber("4111111111111111");

  const payment = new ApiContracts.PaymentType();
  payment.setCreditCard(creditCard);

  const orderType = new ApiContracts.OrderType();
  orderType.setInvoiceNumber(`Inv:${uuidv4()}`));
  orderType.setDescription(utils.getRandomString("Description"));

  const customer = new ApiContracts.CustomerType();
  customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
  customer.setId(utils.getRandomString("Id"));
  customer.setEmail(utils.getRandomInt() + "@test.anet.net");
  customer.setPhoneNumber("1232122122");
  customer.setFaxNumber("1232122122");
  customer.setTaxId("911011011");

  const nameAndAddressType = new ApiContracts.NameAndAddressType();
  nameAndAddressType.setFirstName(utils.getRandomString("FName"));
  nameAndAddressType.setLastName(utils.getRandomString("LName"));
  nameAndAddressType.setCompany(utils.getRandomString("Company"));
  nameAndAddressType.setAddress(utils.getRandomString("Address"));
  nameAndAddressType.setCity(utils.getRandomString("City"));
  nameAndAddressType.setState(utils.getRandomString("State"));
  nameAndAddressType.setZip("98004");
  nameAndAddressType.setCountry("USA");

  const arbSubscription = new ApiContracts.ARBSubscriptionType();
  arbSubscription.setName(utils.getRandomString("Name"));
  arbSubscription.setPaymentSchedule(paymentScheduleType);
  arbSubscription.setAmount(utils.getRandomAmount());
  arbSubscription.setTrialAmount(utils.getRandomAmount());
  arbSubscription.setPayment(payment);
  arbSubscription.setOrder(orderType);
  arbSubscription.setCustomer(customer);
  arbSubscription.setBillTo(nameAndAddressType);
  arbSubscription.setShipTo(nameAndAddressType);

  const createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setSubscription(arbSubscription);

  console.log(
    "createRequest",
    JSON.stringify(createRequest.getJSON(), null, 2)
  );

  const ctrl = new ApiControllers.ARBCreateSubscriptionController(
    createRequest.getJSON()
  );

  ctrl.execute(function () {
    const apiResponse = ctrl.getResponse();

    const response = new ApiContracts.ARBCreateSubscriptionResponse(
      apiResponse
    );

    console.log(
      "ARBCreateSubscriptionResponse",
      JSON.stringify(response, null, 2)
    );

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
        ApiContracts.MessageTypeEnum.OK
      ) {
        console.log("Subscription Id : " + response.getSubscriptionId());
        console.log(
          "Message Code : " + response.getMessages().getMessage()[0].getCode()
        );
        console.log(
          "Message Text : " + response.getMessages().getMessage()[0].getText()
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

    callback(response);
  });
}
