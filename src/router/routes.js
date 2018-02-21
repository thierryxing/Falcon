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
import BuildInfo from '@/views/projects/builds/Info'

import Environments from '@/views/projects/environments/List'
import EnvironmentCLone from '@/views/projects/environments/Clone'
import EnvironmentNew from '@/views/projects/environments/New'
import Configs from '@/views/projects/environments/configs/List'
import ConfigGitClone from '@/views/projects/environments/configs/GitClone'
import ConfigInfo from '@/views/projects/environments/configs/Info'
import ConfigFastlane from '@/views/projects/environments/configs/Fastlane'

import BuildDetail from '@/views/projects/builds/Detail'

import Login from '@/views/account/Login'

import AdminLayout from '@/views/admin/Layout'
import AdminFastlaneTemplates from '@/views/admin/fastlane_templates/List'
import AdminFastlaneTemplatesNew from '@/views/admin/fastlane_templates/New'
import AdminFastlaneTemplatesEdit from '@/views/admin/fastlane_templates/Edit'
import AdminConfigs from '@/views/admin/configs/Index'

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

const adminRoutes = {
  path: '/admin', name: 'admin', component: AdminLayout, redirect: '/admin/configs',
  children: [
    {path: 'configs', name: 'configs', component: AdminConfigs, meta: {contentHeader: {title: 'Admin', subTitle: 'Configs'}}},
    {path: 'fastlane_templates', name: 'fastlane_templates', component: AdminFastlaneTemplates, meta: {contentHeader: {title: 'Admin', subTitle: 'Fastlane Templates'}}},
    {path: 'fastlane_templates/new', name: 'fastlane_templates_new', component: AdminFastlaneTemplatesNew, meta: {contentHeader: {title: 'Admin', subTitle: 'Fastlane Templates'}}},
    {path: 'fastlane_templates/:id/edit', name: 'fastlane_templates_edit', component: AdminFastlaneTemplatesEdit, meta: {contentHeader: {title: 'Admin', subTitle: 'Fastlane Templates'}}}
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
    {name: 'build_info', path: 'environments/:env_id/build_info', component: BuildInfo},
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
  projectRoutes,
  adminRoutes
]
