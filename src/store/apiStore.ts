import create from 'zustand';
import proxyApi from '../services/proxy';

const useApiStore = create((_set: any) => ({
  api: new proxyApi(),
}));
export default useApiStore;