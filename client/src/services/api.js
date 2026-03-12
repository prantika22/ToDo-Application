import axios from 'axios';
import apiFlowMapping from './api-flow-mapping.json';

const backendType = import.meta.env.BACKEND_TYPE || 'nodejs';
const nodejsBaseUrl = import.meta.env.NODEJS_BASE_URL || 'http://localhost:5000/api/';
const activepiecesBaseUrl = import.meta.env.ACTIVEPIECES_BASE_URL || 'https://pds-workflow.tekclansolutions.com/api/v1/hooks/';

const getUrl = (action, restPath, id = null) => {
  if (backendType === 'activepieces') {
    const flowId = apiFlowMapping[action];
    if (!flowId) {
      console.error(`No Activepieces mapping found for action: ${action}`);
      return `${activepiecesBaseUrl}UNKNOWN_FLOW_ID`;
    }
    const url = `${activepiecesBaseUrl}${flowId}/sync`;
    return id ? `${url}?id=${id}` : url;
  }
  return `${nodejsBaseUrl}${restPath}`;
};

export const getTasks = async () => {
  const response = await axios.get(getUrl('get_tasks', 'tasks'));
  console.log("GET TASKS RAW RESPONSE:", response.data);
  return response;
};

export const createTask = async (title, priority) => {
  const response = await axios.post(getUrl('create_task', 'tasks'), { title, priority });
  console.log("CREATE TASK RAW RESPONSE:", response.data);
  
  if (Array.isArray(response.data) && response.data.length > 0) {
    response.data = response.data[0]; 
  }
  return response;
};

export const updateTask = async (id, data) => {
  const response = await axios.put(getUrl('update_task', `tasks/${id}`, id), data);
  console.log("UPDATE TASK RAW RESPONSE:", response.data);
  
  if (Array.isArray(response.data) && response.data.length > 0) {
    response.data = response.data[0];
  }
  return response;
};

export const deleteTask = (id) => axios.delete(getUrl('delete_task', `tasks/${id}`, id));
