import * as Promise from 'bluebird'
import * as cep from 'cep-promise'

export const migrate = (event, context, callback) => {
  return Promise.resolve('01329010')
    .tap(() => console.log('STARTED'))
    .then(cep)
    .tap(console.log)
    .catch(console.log)
    .finally(() => console.log('ENDED'))
}
