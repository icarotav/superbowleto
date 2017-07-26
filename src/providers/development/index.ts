import * as Promise from 'bluebird'
import { always, cond, equals, T } from 'ramda'
import { makeFromLogger } from '../../lib/logger'

const makeLogger = makeFromLogger('development/index')

export const register = (boleto) => {
  const getStatusFromAmount = cond([
    [equals(642), always('pending_registration')],
    [equals(-642), always('refused')],
    [T, always('registered')]
  ])

  const logger = makeLogger({ operation: 'register' })

  return Promise.resolve(boleto)
    .then(bol => ({
      status: getStatusFromAmount(bol.amount)
    }))
    .tap((response) => {
      logger.info({
        status: 'succeeded',
        metadata: {
          status: response.status,
          data: response.data
        }
      })
    })
    .tapCatch(err => logger.error({ status: 'failed', metadata: { err } }))
}
