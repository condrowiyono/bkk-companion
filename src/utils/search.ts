import {SearchResult} from '../interfaces/search';
import {Project} from '../interfaces/project';
import {fetcher} from './fetcher';
import {PreOrder} from '../interfaces/preOrder';

const fetchAll = async (search: string) => {
  if (search.length < 3) {
    return [];
  }

  try {
    const [projects, projectsHistory, po, poHistory] = await Promise.all([
      fetcher<Project[]>({url: '/protected/projects'}),
      fetcher<Project[]>({url: '/protected/projects-history'}),
      fetcher<PreOrder[]>({url: '/protected/po'}),
      fetcher<PreOrder[]>({url: '/protected/po-history'}),
    ]);

    const projectsData = projects.data ?? [];
    const projectsHistoryData = projectsHistory.data ?? [];
    const poData = po.data ?? [];
    const poHistoryData = poHistory.data ?? [];

    let result: SearchResult[] = [];

    if (search === '') {
      return result;
    } else {
      const filterProject = (project: Project) =>
        project.nama_prod.toLowerCase().includes(search.toLowerCase());
      const filterPO = (preOrder: PreOrder) =>
        preOrder.VendorName.toLowerCase().includes(search.toLowerCase());

      const searchResult = projectsData.filter(filterProject).map(project => ({
        value: project.kode_prod,
        label: project.nama_prod,
        type: 'projects' as const,
      }));

      const searchHistoryResult = projectsHistoryData
        .filter(filterProject)
        .map(project => ({
          value: project.kode_prod,
          label: project.nama_prod,
          type: 'projects-history' as const,
        }));

      const searchPoResult = poData.filter(filterPO).map(preOrder => ({
        value: preOrder.PONumber2,
        label: preOrder.VendorName,
        type: 'po' as const,
      }));

      const searchPoHistoryResult = poHistoryData
        .filter(filterPO)
        .map(preOrder => ({
          value: preOrder.PONumber2,
          label: preOrder.VendorName,
          type: 'po-history' as const,
        }));

      result = [
        ...searchResult,
        ...searchHistoryResult,
        ...searchPoResult,
        ...searchPoHistoryResult,
      ];
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {fetchAll};
