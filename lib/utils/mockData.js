var faker = require('faker');
var moment = require('moment');

var _fakeClient = function () {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    customerIdExt: id,
    firstName: faker.name.findName(),
    lastName: faker.name.lastName()
  };
};
var _fakeFullClient = function () {
  var client = _fakeClient();
  client.address1 = faker.address.streetAddress();
  client.address2 = faker.address.streetAddress();
  client.city = faker.address.city();
  client.state = faker.address.state();
  client.zip = faker.address.zipCode('#########');
  client.country = faker.address.countryCode();
  client.phone = faker.phone.phoneNumberFormat(3);
  client.email = faker.internet.email();
  client.dob = moment(faker.date.past()).format('MM/DD/YYYY');
  client.sex = (client.customerIdExt % 2 === 0) ? 'M' : 'F';
  return client;
};
var _fakeDeleteCustomer = function (customerId) {
  return {
    customerId: customerId
  };
};
var _fakeAddCard = function (customerId, billingName) {
  return {
    customerId: customerId,
    creditCardNumber: '4111111111111111',
    expirationMonth: 12,
    expirationYear: 2020,
    billingName: billingName
  };
};
var _fakeDeleteCard = function (customerId, token) {
  return {
    customerId: customerId,
    token: token
  };
};
var _fakeAuth = function (customerId, customerName) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: customerName
    },
    transactionDetail: {
      payType: {
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: ''
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '10.00'
    },
    saveOnFile: {
      customerToken: customerId
    }
  };
};
var _fakeAuthWithToken = function (customerId, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    transactionDetail: {
      payType: {
        onFile: {
          customerId: customerId,
          token: token
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '10.00'
    }
  };
};
var _fakeCapture = function (orderId, referenceNum) {
  return {
    orderID: orderId,
    referenceNum: referenceNum,
    payment: {
      chargeTotal: '10.00'
    }
  };
};
var _fakeVoid = function (transactionID) {
  return {
    transactionID: transactionID
  };
};
var _fakeSale = function (customerId, forValidSale, customerName) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: customerName
    },
    transactionDetail: {
      payType: {
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: ''
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: forValidSale ? '10.00' : '15.33'
    },
    saveOnFile: {
      customerToken: customerId
    }
  };
};
var _fakeSaleWithToken = function (customerId, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    transactionDetail: {
      payType: {
        onFile: {
          customerId: customerId,
          token: token
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '10.00'
    }
  };
};
var _fakeReturnPayment = function (orderId, referenceNum) {
  return {
    orderID: orderId,
    referenceNum: referenceNum,
    payment: {
      chargeTotal: '10.00'
    }
  };
};
var _fakeRecurringPayment = function () {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    shipping: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    transactionDetail: {
      payType: {
        creditCard: {
          number: '4111111111111111',
          expMonth: '12',
          expYear: '2020',
          cvvNumber: ''
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '11.00'
    },
    recurring: {
      action: 'new',
      startDate: tomorrow,
      frequency: '1',
      period: 'monthly',
      installments: '10',
      failureThreshold: '5'
    }
  };
};
var _fakeRecurringPaymentWithToken = function (customerId, token) {
  var id = Math.floor(Math.random() * (10000 - 100)) + 100;
  var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
  return {
    processorID: '1',
    referenceNum: 'PONumber-' + id,
    billing: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    shipping: {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postalcode: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      phone: faker.phone.phoneNumberFormat(3),
      email: faker.internet.email()
    },
    transactionDetail: {
      payType: {
        onFile: {
          customerId: customerId,
          token: token
        }
      }
    },
    payment: {
      currencyCode: 'BRL',
      chargeTotal: '11.00'
    },
    recurring: {
      action: 'new',
      startDate: tomorrow,
      frequency: '1',
      period: 'monthly',
      installments: '10',
      failureThreshold: '5'
    }
  };
};
var _fakeUpdateRecurringPayment = function (orderID) {
  var fiveDaysAhead = moment().add(1, 'days').format('YYYY-MM-DD');
  return {
    orderID: orderID,
    paymentInfo: {
      cardInfo: {
        softDescriptor: 'RECSDNAME'
      }
    },
    recurring: {
      processorID: '1',
      action: 'disable',
      installments: '11',
      nextFireDate: fiveDaysAhead,
      fireDay: '20',
      period: 'quarterly'
    },
    billingInfo: {
      name: faker.name.findName(),
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(3)
    },
    shippingInfo: {
      name: faker.name.findName(),
      address1: faker.address.streetAddress(),
      address2: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode('#########'),
      country: faker.address.countryCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(3)
    }
  };
};
var _fakeCancelRecurringPayment = function (orderID) {
  return {
    orderID: orderID
  };
};

exports.fakeClient = _fakeClient;
exports.fakeFullClient = _fakeFullClient;
exports.fakeDeleteCustomer = _fakeDeleteCustomer;
exports.fakeAddCard = _fakeAddCard;
exports.fakeDeleteCard = _fakeDeleteCard;
exports.fakeAuth = _fakeAuth;
exports.fakeAuthWithToken = _fakeAuthWithToken;
exports.fakeCapture = _fakeCapture;
exports.fakeVoid = _fakeVoid;
exports.fakeSale = _fakeSale;
exports.fakeSaleWithToken = _fakeSaleWithToken;
exports.fakeReturnPayment = _fakeReturnPayment;
exports.fakeRecurringPayment = _fakeRecurringPayment;
exports.fakeRecurringPaymentWithToken = _fakeRecurringPaymentWithToken;
exports.fakeUpdateRecurringPayment = _fakeUpdateRecurringPayment;
exports.fakeCancelRecurringPayment = _fakeCancelRecurringPayment;