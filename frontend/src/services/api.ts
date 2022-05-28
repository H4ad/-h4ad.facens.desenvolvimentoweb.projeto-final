//#region Imports

import axios, { AxiosError, AxiosResponse } from 'axios';

import { KeysEnum } from '../models/enums/keys.enum';
import { CreateIncidentPayload } from '../models/payloads/create-incident.payload';
import { CreateUserPayload } from '../models/payloads/create-user.payload';
import { LoginPayload } from '../models/payloads/login.payload';
import { IncidentProxy } from '../models/proxies/incident.proxy';
import { TokenProxy } from '../models/proxies/token.proxy';
import { UserProxy } from '../models/proxies/user.proxy';

//#endregion

const api = axios.create({
  baseURL: 'http://127.0.0.1:3010',
});

export default api;


/**
 * Método que realiza a autenticação de um usuário
 *
 * @param loginPayload As informações de autenticação
 */
export async function auth(loginPayload: LoginPayload): Promise<TokenProxy | string> {
  const { success, error } = await api.post<TokenProxy>('/auth/local', loginPayload)
    .then((success: AxiosResponse<TokenProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as TokenProxy;

  localStorage.setItem(KeysEnum.TOKEN_PROXY, result.token);

  return result;
}

/**
 * Método que cria um usuário
 *
 * @param userPayload As informações para a criação do usuário
 */
export async function createUser(userPayload: CreateUserPayload): Promise<UserProxy | string> {
  const { success, error } = await api.post<UserProxy>('/users', userPayload)
    .then((success: AxiosResponse<UserProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as UserProxy;

  localStorage.setItem(KeysEnum.USER_PROXY, JSON.stringify(result));

  return result;
}

/**
 * Método que busca as minhas informações
 */
export async function getMe(): Promise<UserProxy | string> {
  const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);
  const headers: Record<string, string> = { Authorization: token || '' };

  const { success, error } = await api.get<UserProxy>('/users/me', { headers })
    .then((success: AxiosResponse<UserProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as UserProxy;

  localStorage.setItem(KeysEnum.USER_PROXY, JSON.stringify(result));

  return result;
}

/**
 * Método que retorna os incidentes
 */
export async function getIncidents(): Promise<IncidentProxy[] | string> {
  const { success, error } = await api.get<IncidentProxy[]>(`/incidents`)
    .then((success: AxiosResponse<IncidentProxy[]>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return success as IncidentProxy[];
}

/**
 * Método que cria um incidente
 *
 * @param incidentPayload As informações para a criação de um incidente
 */
export async function createIncident(incidentPayload: CreateIncidentPayload): Promise<IncidentProxy | string> {
  const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);
  const headers = { Authorization: token || '' };

  const { success, error } = await api.post<IncidentProxy>('/incidents', incidentPayload, { headers })
    .then((success: AxiosResponse<IncidentProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return success as IncidentProxy;
}

/**
 * Método que cria um caso para deletar um incidente
 */
export async function deleteIncident(incidentId: number): Promise<void | string> {
  const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);
  const headers = { Authorization: token || '' };

  const { error } = await api.delete<void>(`/incidents/${ incidentId }`, { headers })
    .then((success: AxiosResponse<void>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data || error, success: void 0 }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return void 0;
}
