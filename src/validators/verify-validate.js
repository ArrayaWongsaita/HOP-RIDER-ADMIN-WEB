import Joi from 'joi';

const verifySchema = Joi.object({
//   firstName: Joi.string()
//     .required()
//     .trim()
//     .messages({ 'string.empty': 'First name is required.' }),

//   lastName: Joi.string()
//     .required()
//     .trim()
//     .messages({ 'string.empty': 'Last name is required.' }),

//   email: Joi.string().required().email({ tlds: false })
//   .messages({ 
//     'string.empty': 'Email is required.',
//     'string.email': 'Email is invalid.'
//   }),

//   phone: Joi.string().required().pattern(/^[0-9]{10}$/)
//   .messages({
//     'string.empty': 'Phone number is required.',
//     'string.pattern.base': 'Phone number requires 10 numbers.'
//   }),

  birthDate: Joi.date().iso().max('now').required()
  .messages({
    'date.format': 'Birth date is required.',
    'date.max': 'Are you sure that is your birth date ?'
  }),
  
  idCard: Joi.string().required().pattern(/^[0-9]{13}$/)
  .messages({
    'string.empty': 'ID card number is required.',
    'string.pattern.base': 'ID Card number requires 13 numbers.'
  }),
  address: Joi.string().required()
  .messages({
    'string.empty': 'Address is required.'
  })
  
});

const verifyValidate = input => {
  const { error } = verifySchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
    //   return error.details;
      return acc;
    }, {});

    return result;
  }
};

export default verifyValidate;