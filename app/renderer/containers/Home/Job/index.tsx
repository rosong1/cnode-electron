
import DataFetcherHoc from '@renderer/containers/Home/DataFetcherHoc'
import HomeView from '@renderer/containers/Home/components/HomeView'
export default DataFetcherHoc('job')(HomeView)