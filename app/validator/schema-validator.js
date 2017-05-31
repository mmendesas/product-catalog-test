var _ = require('lodash');
var jsonschema = require('jsonschema');

function JsonSchemaValidation(validations) {
    this.name = 'MySchemaValidation';
    this.message = 'schema-validation: Invalid data found';
    this.validations = formatValidations(validations);
};

function formatValidations(validations) {
    var formatted = {};

    Object.keys(validations).forEach(function (requestProperty) {
        var validation = validations[requestProperty],
            propertyValidations = [],
            currentPropertyValidation = {};

        validation.errors.forEach(function (propertyValidation) {
            var isNewProperty = currentPropertyValidation.property !== propertyValidation.property;

            if (isNewProperty) {
                currentPropertyValidation = {
                    value: propertyValidation.instance,
                    property: propertyValidation.property,
                    messages: [propertyValidation.message]
                };
                propertyValidations.push(currentPropertyValidation);
            } else {
                currentPropertyValidation.messages.push(propertyValidation.message);
            }
        });

        formatted[requestProperty] = propertyValidations;
    });

    return formatted;
}

var schemaValidator = {

    validate: function (schemas) {

        var validator = new jsonschema.Validator();

        return function (req, res, next) {
            var validations = {};
            Object.keys(schemas).forEach(function (reqProperty) {
                var schema = schemas[reqProperty], validation;

                validation = validator.validate(
                    req[reqProperty],
                    schema,
                    { propertyName: 'request.' + reqProperty }
                );

                if (!validation.valid) {
                    validations[reqProperty] = validation;
                }
            });

            if (Object.keys(validations).length) {
                next(new JsonSchemaValidation(validations));
            } else {
                next();
            }
        };

    }
}

module.exports = schemaValidator;