"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.toExpressHandler = exports.expressErrorsWrapper = exports.ResponseSuccessJson = exports.ResponseErrorInternal = void 0;
/** returns Internal Error and reports the error to slack bot, besides logging to standard console.error */
function ResponseErrorInternal(error, message) {
    if (message === void 0) { message = 'Internal Server Error'; }
    var stack = error.stack;
    //console.warn('Internal server error:', error);
    return {
        apply: function (res) {
            return res.status(500).json({ message: message, error: error, stack: stack });
        },
        kind: 'ResponseErrorInternal',
        status: 500,
        value: error,
    };
}
exports.ResponseErrorInternal = ResponseErrorInternal;
function ResponseSuccessJson(o, status) {
    if (status === void 0) { status = 200; }
    return {
        apply: function (res) { return res.status(status).json(o); },
        kind: 'ResponseSuccessJson',
        status: status,
        value: o,
    };
}
exports.ResponseSuccessJson = ResponseSuccessJson;
/**
 * Converts errors in Responses, according to their status code
 * to their status codes
 * @param err
 * @param req
 */
var expressErrorsWrapper = function (err, req) { return ResponseErrorInternal(err); };
exports.expressErrorsWrapper = expressErrorsWrapper;
/**
* Convenience method that transforms a function (handler),
* which takes an Request as input and returns an IResponse,
* into an express controller.
*/
function toExpressHandler(handler, object) {
    return function (req, res) {
        return handler
            .call(object, req)
            .catch(function (err) { return (0, exports.expressErrorsWrapper)(err, req); })
            .then(function (response) {
            response.apply(res);
        });
    };
}
exports.toExpressHandler = toExpressHandler;
var errorHandler = function (error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).send();
    // res.render("error", { error });
};
exports.errorHandler = errorHandler;
