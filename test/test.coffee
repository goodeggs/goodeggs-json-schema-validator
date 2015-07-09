expect = require('chai').expect
require 'mocha-sinon'
{validateQuery, validateParams, validateBody, validateOther} = require '..'
express = require 'express'
crashpad = require 'crashpad'
namespacedRequest = require 'namespaced-request'
bodyParser = require 'body-parser'

describe 'express-json-schema-validator', ->
  setupServer = (router) ->
    before (done) ->
      @app = express()
      @app.use router
      @app.use crashpad()
      @app.server = @app.listen 9001, done

    after (done) ->
      @app.server.close =>
        @app = null
        done()

  before ->
    @request = namespacedRequest("http://127.0.0.1:9001")

  describe 'validateQuery', ->
    setupServer express.Router().get '/',
      validateQuery({
        properties:
          'name':
            type: 'string'
            pattern: '^[a-zA-Z]+$'
      })
      (req, res) -> res.send('OK')

    describe 'with invalid querystring', ->
      beforeEach (done) ->
        @request.get '/?name=123', (err, @response) => done err

      it 'fails', ->
        expect(@response).to.have.property 'statusCode', 400
        expect(@response.body?.message).to.match /name.*query/i

    describe 'with valid querystring', ->
      beforeEach (done) ->
        @request.get '/?name=abc', (err, @response) => done err

      it 'succeeds', ->
        expect(@response).to.have.property 'statusCode', 200


  describe 'validateParams', ->
    setupServer express.Router().get '/:name',
      validateParams({
        properties:
          'name':
            type: 'string'
            pattern: '^[a-zA-Z]+$'
      })
      (req, res) -> res.send('OK')

    describe 'with invalid URL params', ->
      beforeEach (done) ->
        @request.get '/123', (err, @response) => done err

      it 'fails', ->
        expect(@response).to.have.property 'statusCode', 400
        expect(@response.body?.message).to.match /name.*param/i

    describe 'with valid URL params', ->
      beforeEach (done) ->
        @request.get '/abc', (err, @response) => done err

      it 'succeeds', ->
        expect(@response).to.have.property 'statusCode', 200


  describe 'validateBody', ->
    setupServer express.Router().post '/',
      bodyParser.json(),
      validateBody({
        properties:
          'name':
            type: 'string'
            pattern: '^[a-zA-Z]+$'
      }),
      (req, res) -> res.send('OK')

    describe 'with invalid body', ->
      beforeEach (done) ->
        @request.post {
          url: '/'
          json: { name: '123' }
        }, (err, @response) => done err

      it 'fails', ->
        expect(@response).to.have.property 'statusCode', 400
        expect(@response.body?.message).to.match /name.*body/i

    describe 'with valid body', ->
      beforeEach (done) ->
        @request.post {
          url: '/'
          json: { name: 'abc' }
        }, (err, @response) => done err

      it 'succeeds', ->
        expect(@response).to.have.property 'statusCode', 200


  describe 'options', ->

    describe 'banUnknownProperties', ->
      describe 'default (false)', ->
        setupServer express.Router().get '/',
          validateQuery({
            properties:
              'name': { type: 'string' }
          })
          (req, res) -> res.send('OK')

        beforeEach (done) ->
          @request.get '/?name=elmo&age=30', (err, @response) => done err

        it 'allows unknown properties', ->
          expect(@response).to.have.property 'statusCode', 200

      describe 'true', ->
        setupServer express.Router().get '/',
          validateQuery({
            properties:
              'name': { type: 'string' }
          }, {
            banUnknownProperties: true
          })
          (req, res) -> res.send('OK')

        beforeEach (done) ->
          @request.get '/?name=elmo&age=30', (err, @response) => done err

        it 'does not allow unknown properties', ->
          expect(@response).to.have.property 'statusCode', 400
          expect(@response.body?.message).to.match /unknown.*age.*query/i


