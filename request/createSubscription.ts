const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;
import { v4 as uuidv4 } from "uuid";

type createSubscriptionDataType = {
  paymentStartDate: string;
  expiry: string;
  cardNumber: string;
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
  title: string;
  amount: string;
};

export default function createSubscription(
  data: createSubscriptionDataType,
  res: any
) {
  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY
  );

  const userId = uuidv4();

  const interval = new ApiContracts.PaymentScheduleType.Interval();
  interval.setLength(1);
  interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

  const paymentScheduleType = new ApiContracts.PaymentScheduleType();
  paymentScheduleType.setInterval(interval);
  paymentScheduleType.setStartDate(data.paymentStartDate);
  paymentScheduleType.setTotalOccurrences(5);
  paymentScheduleType.setTrialOccurrences(0);

  const creditCard = new ApiContracts.CreditCardType();
  creditCard.setExpirationDate(data.expiry);
  creditCard.setCardNumber(data.cardNumber);

  const payment = new ApiContracts.PaymentType();
  payment.setCreditCard(creditCard);

  const orderType = new ApiContracts.OrderType();
  orderType.setInvoiceNumber(`Inv:${uuidv4()}`);
  orderType.setDescription(data.description);

  const customer = new ApiContracts.CustomerType();
  customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
  customer.setId(userId);
  customer.setEmail(data.email);
  // customer.setPhoneNumber();
  // customer.setFaxNumber("1232122122");
  // customer.setTaxId("911011011");

  const nameAndAddressType = new ApiContracts.NameAndAddressType();
  nameAndAddressType.setFirstName(data.firstName);
  nameAndAddressType.setLastName(data.lastName);
  // nameAndAddressType.setCompany(utils.getRandomString("Company"));
  nameAndAddressType.setAddress(data.address);
  nameAndAddressType.setCity(data.city);
  nameAndAddressType.setState(data.state);
  nameAndAddressType.setZip(data.zip);
  nameAndAddressType.setCountry(data.country);

  const arbSubscription = new ApiContracts.ARBSubscriptionType();
  arbSubscription.setName(data.title);
  arbSubscription.setPaymentSchedule(paymentScheduleType);
  arbSubscription.setAmount(data.amount);
  arbSubscription.setTrialAmount("0.00");
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
    console.log("response", response);
    res.status(200).send(response);
  });
}
