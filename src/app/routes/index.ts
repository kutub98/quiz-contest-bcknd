import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { BannerRoutes } from '../modules/Banner/Banner.route';
import { IssueRoutes } from '../modules/Issue/issue.route';
import { ServiceRoute } from '../modules/Services/Service.route';
import { OfferRouter } from '../modules/Offer/Package.route';
import { GallaryRouter } from '../modules/Gallary/Gallary.route';
import { CustomerRouter } from '../modules/CustomerImg/Customer.route';
import { PackageRouter } from '../modules/Packages/Package.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
  {
    path: '/issues',
    route: IssueRoutes,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/packages',
    route: PackageRouter,
  },
  {
    path: '/offers',
    route: OfferRouter,
  },
  {
    path: '/gallary',
    route: GallaryRouter,
  },
  {
    path: '/customer',
    route: CustomerRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
