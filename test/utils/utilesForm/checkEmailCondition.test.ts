const { describe, it, expect } = require('@jest/globals');
const {UtilsForm} = require('../../../utils/utilsForm');

describe('UtilsForm', () => {
    describe('checkEmailCondition', () => {
      it('should return an empty array if the email is valid', async () => {
        const result = await UtilsForm.checkEmailCondition('valid@example.com');
        expect(result).toEqual([]);
      });
  
      it('should return an error if the email is invalid', async () => {
        const result = await UtilsForm.checkEmailCondition('invalid-email');
        expect(result).toContain('regexEmail');
      });
    });
  });