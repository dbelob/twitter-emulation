import validator from 'validator';

export function validateData(data: any, rules: any) {
    const errors: any = {};

    Object.keys(data).forEach(field => {
        if (rules.hasOwnProperty(field)) {
            const fieldErrors = [];
            let val = data[field];

            if (rules[field].true) {
                if (!val) {
                    fieldErrors.push(`You must checked a ${field}`);
                }
            } else {
                if (rules[field].required && validator.isEmpty(val)) {
                    fieldErrors.push(`You must enter a ${field}`);
                }

                if (!validator.isEmpty(data[field])) {
                    if (rules[field].minlength && !validator.isLength(val, {min: rules[field].minlength})) {
                        fieldErrors.push(`A ${field} must be at least ${rules[field].minlength} characters`);
                    }

                    if (rules[field].maxlength && !validator.isLength(val, {max: rules[field].maxlength})) {
                        fieldErrors.push(`A ${field} must be no more than ${rules[field].maxlength} characters`);
                    }

                    if (rules[field].alpha && !validator.isAlpha(val)) {
                        fieldErrors.push("Enter only letters");
                    }

                    if (rules[field].email && !validator.isEmail(val)) {
                        fieldErrors.push(`You must enter a valid email address in ${field}`);
                    }

                    if (rules[field].equals && !validator.equals(val, data[rules[field].equals])) {
                        fieldErrors.push(`A ${field} and ${rules[field].equals} must be the same`);
                    }
                }
            }

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        }
    })

    return errors;
}
