import React from 'react';
import { useLocation } from 'react-router-dom';
import breadcrumbRoutes from '../navigation/routes';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';

// Utility function to extract dynamic parameters
const extractParams = (path, pattern) => {
  const paramPattern = new RegExp(pattern.replace(/:\w+/g, '([^/]+)'));
  const match = paramPattern.exec(path);
  if (!match) return {};
  
  // Extract matched parameters (excluding the full match at index 0)
  return match.slice(1).reduce((params, value, index) => {
    const key = pattern.match(/:\w+/g)[index]?.slice(1);
    if (key) params[key] = value;
    return params;
  }, {});
};

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const {breadcrumbTitles} = useSelector(state => state.breadcrumbData);

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = '';
    let params = {};

    pathnames.forEach((_, index) => {
      currentPath = `/${pathnames.slice(0, index + 1).join('/')}`;
      const route = breadcrumbRoutes.find(route => {
        // Create a regex pattern for dynamic routes
        const pathPattern = `^${route.path.replace(/:\w+/g, '([^/]+)')}$`;
        const pathRegex = new RegExp(pathPattern);
        return pathRegex.test(currentPath);
      });

      if (route) {
        // Extract parameters from the currentPath
        params = extractParams(currentPath, route.path);
        // console.log(params)
        if (route.parents) {
          route.parents.forEach(parent => {
            breadcrumbs.push({ path: parent.url, label: parent.label });
          });
        }

        // Replace dynamic segments with extracted values
        console.log(params,'my params')
        const breadcrumbLabel = breadcrumbTitles[currentPath]  ||  route.label.replace(/:\w+/g, match => params[match.slice(1)] || match);
        if(params[breadcrumbLabel]) console.log(params[breadcrumbLabel],'my label')
        breadcrumbs.push({ path: currentPath, label: breadcrumbLabel });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  // console.log(breadcrumbs,'breadcrumbs')
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        index === breadcrumbs.length - 1 ? (
          <Typography key={index} color="text.primary">
            {breadcrumb.label}
          </Typography>
        ) : (
          <Link
            key={index}
            href={breadcrumb.path}
            underline="hover"
            color="inherit"
          >
            {breadcrumb.label}
          </Link>
        )
      ))}
    </Breadcrumbs>

  );
};

export default BreadcrumbsComponent;
