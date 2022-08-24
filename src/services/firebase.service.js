import { v4 as uuidv4 } from 'uuid';
import { logError } from '../utils';

/**
 * Creates a new object at database reference
 * @param {Reference} ref
 * @param {object} payload
 * @returns
 */
export const createFbObject = async (ref, payload) => {
  try {
    const data = Object.assign({ createdAt: Date.now() }, payload);
    const id = uuidv4();
    const result = await ref.child(id).set(data);
    return !!result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Fetches a single or multiple objects from database reference based on query
 * @param {Reference} ref
 * @param {object} query
 */
export const getFbObjects = async (ref, query, single = false) => {
  try {
    const [entries] = Object.entries(query);
    const [key, value] = entries;
    const snapshot = await ref.orderByChild(key).equalTo(value).once('value');
    const obj = snapshot.exists() ? Object.values(snapshot.val()) : null;
    if (single && obj) {
      return obj[0];
    }
    return obj;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Fetches all objects from database reference
 * @param {Reference} ref
 */
export const getAllFbObjects = async (ref) => {
  try {
    const snapshot = await ref.once('value');
    const objArray = snapshot.exists() ? Object.values(snapshot.val()) : [];
    return objArray;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Updates queried object with specified payload
 * @param {Reference} ref
 * @param {object} query
 * @param {object} payload
 * @return boolean
 */
export const updateFbObject = async (ref, query, payload) => {
  try {
    const [entries] = Object.entries(query);
    const [key, value] = entries;
    const data = Object.assign({ updatedAt: Date.now() }, payload);
    const snapshot = await ref.orderByChild(key).equalTo(value).once('value');
    if (snapshot.exists()) {
      const keyVal = snapshot.val();
      const key = Object.keys(keyVal)[0];
      ref.child(key).update(data);
      return true;
    }
    return false;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Permanently deletes queried object from database reference
 * @param {Reference} ref
 * @param {object} query
 */
export const deleteFbObject = async (ref, query) => {
  try {
    const [entries] = Object.entries(query);
    const [key, value] = entries;
    const snapshot = await ref.orderByChild(key).equalTo(value).once('value');
    if (snapshot.exists()) {
      const keyVal = snapshot.val();
      const key = Object.keys(keyVal)[0];
      ref.child(key).remove();
      return true;
    }
    return false;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Replaces all existing object in database reference with payload
 * @param {Reference} ref
 * @param {object} payload
 */
export const setFbRef = async (ref, payload) => {
  try {
    const result = await ref.set(payload);
    return !!result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Replaces queried object in database reference with payload
 * @param {Reference} ref
 * @param {object} payload
 */
export const setFbObject = async (ref, query, payload) => {
  try {
    const [entries] = Object.entries(query);
    const [key, value] = entries;
    const snapshot = await ref.orderByChild(key).equalTo(value).once('value');
    const obj = snapshot.exists() ? Object.values(snapshot.val())[0] : null;
    if (obj) {
      const id = Object.keys(obj)[0];
      ref.child(id).set(payload);
      return true;
    }
    return false;
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Checks if the object exists in database with specified key/value query
 * @param {Reference} ref
 * @param {object} query
 */
export const fbObjectExists = async (ref, query) => {
  try {
    const [entries] = Object.entries(query);
    const [key, value] = entries;
    const snapshot = await ref.orderByChild(key).equalTo(value).once('value');
    return snapshot.exists();
  } catch (error) {
    logError(error);
    throw error;
  }
};

/**
 * Function to paginate an array of items
 * @param {Array} list
 * @param {Number} pageNumber
 * @param {Number} pageSize
 * @returns
 */
export const paginateResponse = (list, pageNumber = 1, pageSize = 10) => {
  list = list ?? [];
  pageSize = Number(pageSize);
  pageNumber = Number(pageNumber);
  let response = {
    items: [],
    pageInfo: {},
  };
  let pageInfo = {
    pageSize: 0,
    pageNumber: 1,
    totalItems: 0,
    totalPages: 0,
  };
  pageInfo.pageSize = pageSize;
  pageInfo.pageNumber = pageNumber;
  pageInfo.totalItems = list.length;
  pageInfo.totalPages = Math.ceil(list.length / pageSize);
  const startIndex = pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;
  const items = list.splice(startIndex, startIndex + pageSize);
  response.items = items;
  response.pageInfo = pageInfo;
  return response;
};
