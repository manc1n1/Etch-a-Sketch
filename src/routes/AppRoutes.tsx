import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Layout';
import EtchASketch from '@/pages/EtchASketch';
import PageNotFound from '@/pages/PageNotFound';

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<EtchASketch />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRoutes;
