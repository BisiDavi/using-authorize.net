export type formStateType = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentStartDate: string;
  numberofOccurence: number;
  carName?: string;
};

export type subscriptionType = {
  createTimeStampUTC: string;
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  totalOccurrences: string;
  pastOccurrences: string;
  paymentMethod: string;
  amount: number;
  customerProfileId: string;
  customerPaymentProfileId: string;
  customerShippingProfileId: string;
  status: string;
};
