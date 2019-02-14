var axios = require("axios");
var convert = require("xml-js");
var xmlBuilders = require("../core/xmlBuilders");

exports.Gateway = (function() {

  function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) {
      return nValue;
    }
    var bValue = value.toLowerCase();
    if (bValue === "true") {
      return true;
    } else if (bValue === "false") {
      return false;
    }
    return value;
  }

  var removeJsonTextAttribute = function(value, parentElement) {
    try {
      var keyNo = Object.keys(parentElement._parent).length;
      var keyName = Object.keys(parentElement._parent)[keyNo - 1];
      parentElement._parent[keyName] = nativeType(value);
    } catch (e) { }
  };

  function formatMaxiPagoResponse(xmlResponse) {
    var xml = xmlResponse.data;
    xml = xml.replace("rapi-response", "response");
    xml = xml.replace("rapi-response", "response");
    xml = xml.replace("api-response", "response");
    xml = xml.replace("api-response", "response");
    xml = xml.replace("transaction-response", "response");
    xml = xml.replace("transaction-response", "response");

    var jsonResponse = JSON.parse(convert.xml2json(xml, XML_CONVERT_OPTIONS));

    if (typeof jsonResponse.response != "undefined") {
      return jsonResponse.response;
    } else {
      var jsonResponse = JSON.parse(convert.xml2json(xml, XML_CONVERT_OPTIONS));
      return jsonResponse;
    }
  }

  var MP_API_VERSION = "3.1.1.15";
  var MP_AUTH = {};
  var MP_POST_API = "/UniversalAPI/postAPI";
  var MP_POST_XML = "/UniversalAPI/postXML";
  var MP_QUERY_API = "/ReportsAPI/servlet/ReportsAPI";
  var XML_OPTIONS = {
    explicitRoot: false,
    explicitArray: true
  };
  var XML_CONVERT_OPTIONS = {
    compact: true,
    trim: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
    textFn: removeJsonTextAttribute
  };

  function Gateway(merchantId, merchantKey, maxiPagoEnv) {
    if (!merchantKey) {
      throw new Error("No merchantKey found");
    }

    MP_BASEURL = "https://" + (maxiPagoEnv.toLowerCase() !== "production" ? "test" : "") + "api.maxipago.net";
    MP_HEADERS = { headers: { "Content-Type": "text/xml; charset=utf-8" } };
    MP_AUTH = { merchantId: merchantId, merchantKey: merchantKey };

    this.addCustomer = function*(client) {
      let clientXML = xmlBuilders.buildAddCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        clientXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.updateCustomer = function*(client) {
      var clientXML = xmlBuilders.buildUpdateCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        clientXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.deleteCustomer = function*(client) {
      var clientXML = xmlBuilders.buildDeleteCustomerXML(
        client,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        clientXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };

    this.zeroDollar = function*(card) {
      var zeroDollarXML = xmlBuilders.buildZeroDollarXML(
        card,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        zeroDollarXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.addCard = function*(card) {
      var cardXML = xmlBuilders.buildAddCardXML(card, MP_AUTH, XML_OPTIONS);
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        cardXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.deleteCard = function*(card) {
      var cardXML = xmlBuilders.buildDeleteCardXML(card, MP_AUTH, XML_OPTIONS);
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        cardXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };

    this.auth = function*(auth) {
      var authXML = xmlBuilders.buildAuthXML(
        auth,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        authXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.capture = function*(capture) {
      var captureXML = xmlBuilders.buildCaptureXML(
        capture,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        captureXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.void = function*(_void) {
      var voidXML = xmlBuilders.buildVoidXML(
        _void,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        voidXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.sale = function*(sale) {
      var saleXML = xmlBuilders.buildSaleXML(
        sale,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        saleXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.returnPayment = function*(_return) {
      var returnPaymentXML = xmlBuilders.buildReturnPaymentXML(
        _return,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        returnPaymentXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };

    this.recurringPayment = function*(recurringPayment) {
      var recurringPaymentXML = xmlBuilders.buildRecurringPaymentXML(
        recurringPayment,
        MP_API_VERSION,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_XML,
        recurringPaymentXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.updateRecurringPayment = function*(updateRecurringPayment) {
      var updateRecurringPaymentXML = xmlBuilders.buildUpdateRecurringPaymentXML(
        updateRecurringPayment,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        updateRecurringPaymentXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };
    this.cancelRecurringPayment = function*(cancelRecurringPayment) {
      var cancelRecurringPaymentXML = xmlBuilders.buildCancelRecurringPaymentXML(
        cancelRecurringPayment,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_POST_API,
        cancelRecurringPaymentXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse;
    };

    this.transactionQuery = function*(transactionId) {
      var transactionQueryXML = xmlBuilders.buildTransactionQueryXML(
        transactionId,
        MP_AUTH,
        XML_OPTIONS
      );
      let xmlResponse = yield axios.post(
        MP_BASEURL + MP_QUERY_API,
        transactionQueryXML,
        MP_HEADERS
      );
      let jsonResponse = yield formatMaxiPagoResponse(xmlResponse);
      return jsonResponse.result.records.record;
    };

    return this;
  }

  var _buildGateway = function(testMerchantId, testMerchantKey, maxiPagoEnv) {
    return new Gateway(testMerchantId, testMerchantKey, maxiPagoEnv);
  };

  exports.buildGateway = _buildGateway;

  return Gateway;
})();
