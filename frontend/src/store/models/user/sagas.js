import { all, takeLatest, put, call } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { USER_UPDATE_PROFILE_REQUEST } from '~/constants/User'
import api from '~/services/api'
import { updateProfileFailure, updateProfileSuccess } from './actions'

export function * updateProfile ({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, 'users', profile)
    toast.success('Perfil alterado com sucesso.')

    yield put(updateProfileSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao alterar perfil')
    yield put(updateProfileFailure())
  }
}
export default all([takeLatest(USER_UPDATE_PROFILE_REQUEST, updateProfile)])
