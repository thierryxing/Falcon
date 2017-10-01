/**
 * Created by Thierry on 2017/6/14.
 */
import Layout from '@/views/Layout'
import Dashboard from '@/views/dashboard/List'
import Jobs from '@/views/jobs/Index'
import Activity from '@/views/activity/List'
import Members from '@/views/members/List'
import Projects from '@/views/projects/List'

import ProjectLayout from '@/views/projects/Layout'
import ProjectNew from '@/views/projects/New'
import ProjectEdit from '@/views/projects/Edit'
import ProjectHome from '@/views/projects/Home'

import Services from '@/views/projects/services/List'
import ServiceEdit from '@/views/projects/services/Edit'

import Builds from '@/views/projects/builds/List'
import PreBuildLib from '@/views/projects/builds/PreBuildLib'
import PreBuildBeta from '@/views/projects/builds/PreBuildBeta'
import PreBuildTest from '@/views/projects/builds/PreBuildTest'
import PreBuildProd from '@/views/projects/builds/PreBuildProd'

import Environments from '@/views/projects/environments/List'
import EnvironmentCLone from '@/views/projects/environments/Clone'
import EnvironmentNew from '@/views/projects/environments/New'
import Configs from '@/views/projects/environments/configs/List'
import ConfigGitClone from '@/views/projects/environments/configs/GitClone'
import ConfigInfo from '@/views/projects/environments/configs/Info'
import ConfigFastlane from '@/views/projects/environments/configs/Fastlane'

import BuildDetail from '@/views/projects/builds/Detail'

import Login from '@/views/account/Login'

const loginRoutes = {
  path: '/login',
  name: 'login',
  component: Login
}

const dashboardRoutes = {
  path: '/', name: 'root', component: Layout, redirect: '/dashboard',
  children: [
    {path: 'dashboard', name: 'dashboard', component: Dashboard, meta: {contentHeader: {title: 'Dashboard', subTitle: 'Control panel'}}},
    {path: 'jobs', name: 'jobs', component: Jobs, meta: {contentHeader: {title: 'Background Jobs', subTitle: 'Sidekiq'}}},
    {path: 'activity', name: 'activity', component: Activity, meta: {contentHeader: {title: 'Activity', subTitle: 'Executing jobs'}}},
    {path: 'members', name: 'members', component: Members, meta: {contentHeader: {title: 'Member', subTitle: 'list'}}},
    {path: 'project_list', name: 'project_list', component: Projects, meta: {contentHeader: {title: 'Project', subTitle: 'list'}}},
    {path: 'new_project', name: 'project_new', component: ProjectNew, meta: {contentHeader: {title: 'Project', subTitle: 'new'}}}
  ]
}

const projectRoutes = {
  path: '/projects/:project_id', component: ProjectLayout,
  children: [
    {name: 'home', path: 'home', component: ProjectHome},
    {name: 'setting', path: 'setting', component: ProjectEdit},
    {name: 'environments', path: 'environments', component: Environments},
    {name: 'builds', path: 'builds', component: Builds},
    {name: 'build_detail', path: 'builds/:build_id', component: BuildDetail},
    {name: 'pre_build_lib', path: 'environments/:env_id/pre_build_lib', component: PreBuildLib},
    {name: 'pre_build_beta', path: 'environments/:env_id/pre_build_beta', component: PreBuildBeta},
    {name: 'pre_build_test', path: 'environments/:env_id/pre_build_test', component: PreBuildTest},
    {name: 'pre_build_prod', path: 'environments/:env_id/pre_build_prod', component: PreBuildProd},
    {name: 'environments_new', path: 'environments/new', component: EnvironmentNew},
    {name: 'services', path: 'services', component: Services},
    {name: 'service_edit', path: 'services/:service_id/edit', component: ServiceEdit},
    {name: 'environment_clone', path: 'environments/:env_id/clone', component: EnvironmentCLone},
    {
      name: 'environment_configs',
      path: 'environments/:env_id/configs',
      component: Configs,
      children: [
        {name: 'git_clone', path: 'git_clone', component: ConfigGitClone},
        {name: 'fastlane', path: 'fastlane', component: ConfigFastlane},
        {name: 'info', path: 'info', component: ConfigInfo}
      ]
    }
  ]
}

export default [
  loginRoutes,
  dashboardRoutes,
  projectRoutes
]
