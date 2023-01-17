const { describe, test, expect } = require('@jest/globals');
const aws = require('aws-sdk');
aws.config.update({
    region: 'us-east-1'
})
const requestMock = require('./../mocks/request.json');
const { main } = require('../../src')

describe('Image analyser test suite', () => {
    test('it should analyse successfuly the image returning the results', async () => {
        const finalText = [
            "99.78% de ser do tipo Abissínio",
            "99.78% de ser do tipo gato",
            "99.78% de ser do tipo animal de estimação",
            "99.78% de ser do tipo mamífero",
            "99.78% de ser do tipo animal",
            "67.48% de ser do tipo gatinho",
        ].join('\n')
        const expected = {
            statusCode: 200,
            body: `A imagem tem\n`.concat(finalText),
        }

        const result = await main(requestMock);
        expect(result).toStrictEqual(expected); 
    })
    test('given an empaty queryString it return status code 400', async () => {
        const expected = {
            statusCode: 400,
            body: 'An image is required'
        }

        const result = await main({ queryStringParameters: {} });
        expect(result).toStrictEqual(expected); 
    })
    test('given an invalid ImageUrl it should return 500', async () => {
        const expected = {
            statusCode: 500,
            body: 'Internal Server Error!'
        }

        const result = await main({ 
            queryStringParameters: {
                imageUrl: "quebra trem"
        }});
        expect(result).toStrictEqual(expected); 
    })
})