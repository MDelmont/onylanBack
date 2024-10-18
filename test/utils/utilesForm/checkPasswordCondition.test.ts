const { describe, it, expect } = require('@jest/globals');
const {UtilsForm} = require('../../../utils/utilsForm');


describe('UtilsForm', () => {
  describe('checkPasswordCondition', () => {
    it('should return an empty array if the password meets all conditions', async () => {
      const result = await UtilsForm.checkPasswordCondition('ValidPassword1!', 'ValidPassword1!');
      expect(result).toEqual([]);
    });

    it('should return errors if the password does not meet the conditions', async () => {
      const result = await UtilsForm.checkPasswordCondition('short', 'short');
      expect(result).toContain('passwordSize');
    });

    it('should return an error if the passwords do not match', async () => {
      const result = await UtilsForm.checkPasswordCondition('ValidPassword1!', 'InvalidPassword!');
      expect(result).toContain('samePassword');
    });
  });
});
