/**
 * Created by Thierry on 2017/6/14.
 */
import Layout from '@/views/Layout'
import Dashboard from '@/views/Dashboard'
import Job from '@/views/Job/Index'
import Guardians from '@/views/Guardian/List'
import ProjectLayout from '@/views/projects/Layout'
import ProjectNew from '@/views/projects/New'
import ProjectEdit from '@/views/projects/Edit'
import ProjectHome from '@/views/projects/Home'

import Services from '@/views/projects/services/List'
import ServiceEdit from '@/views/projects/services/Edit'

import Builds from '@/views/projects/builds/List'
import PreBuildLib from '@/views/projects/builds/PreBuildLib'
import CheckDependency from '@/views/projects/builds/CheckDependency'

import Environments from '@/views/projects/environments/List'
import Configs from '@/views/projects/environments/configs/List'
import ConfigGitClone from '@/views/projects/environments/configs/GitClone'
import ConfigInfo from '@/views/projects/environments/configs/Info'
import ConfigFastlane from '@/views/projects/environments/configs/Fastlane'
import EnvironmentsNew from '@/views/projects/environments/New'

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
    {path: 'dashboard', name: 'dashboard', component: Dashboard},
    {path: 'job', name: 'job', component: Job},
    {path: 'guardian', name: 'guardian', component: Guardians},
    {path: 'new_project', name: 'project_new', component: ProjectNew}
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
    {name: 'check_dependency', path: 'environments/:env_id/check_dependency', component: CheckDependency},
    {name: 'environments_new', path: 'environments/new', component: EnvironmentsNew},
    {name: 'services', path: 'services', component: Services},
    {name: 'service_edit', path: 'services/:service_id/edit', component: ServiceEdit},
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
