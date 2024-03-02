import {SearchResult} from '../interfaces/search';
import {Project} from '../interfaces/project';
import {fetcher} from './fetcher';

const fetchAll = async (search: string) => {
  try {
    const [projects, projectsHistory] = await Promise.all([
      fetcher<Project[]>({url: '/protected/projects'}),
      fetcher<Project[]>({url: '/protected/projects-history'}),
    ]);

    const projectsData = projects.data ?? [];
    const projectsHistoryData = projectsHistory.data ?? [];

    let result: SearchResult[] = [];

    if (search === '') {
      return result;
    } else {
      const filterBySearch = (project: Project) =>
        project.nama_prod.toLowerCase().includes(search.toLowerCase());

      const searchResult = projectsData.filter(filterBySearch).map(project => ({
        value: project.kode_prod,
        label: project.nama_prod,
        type: 'projects',
      }));

      const searchHistoryResult = projectsHistoryData
        .filter(filterBySearch)
        .map(project => ({
          value: project.kode_prod,
          label: project.nama_prod,
          type: 'projects-history',
        }));

      result = [...searchResult, ...searchHistoryResult];
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

export {fetchAll};
