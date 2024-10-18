const { describe, it, expect } = require('@jest/globals');
const {UtilsForm} = require('../../../utils/utilsForm');

describe('UtilsForm', () => {
  describe('checkMissingField', () => {
    it('should return an empty array if all required fields are present', async () => {
      const req = {
        body: {
          field1: 'value1',
          field2: 'value2',
        },
      };
      const requiredFields = ['field1', 'field2'];
      const result = await UtilsForm.checkMissingField(req, requiredFields);
      expect(result).toEqual([]);
    });

    it('should return missing fields if some are missing', async () => {
      const req = {
        body: {
          field1: 'value1',
        },
      };
      const requiredFields = ['field1', 'field2'];
      const result = await UtilsForm.checkMissingField(req, requiredFields);
      expect(result).toEqual(['field2']);
    });

    it('should return all fields as missing if body is null', async () => {
      const req = {
        body: null,
      };
      const requiredFields = ['field1', 'field2'];
      const result = await UtilsForm.checkMissingField(req, requiredFields);
      expect(result).toEqual(requiredFields);
    });
  });
});
