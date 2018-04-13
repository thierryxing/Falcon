/**
 * Created by Thierry on 2017/4/14.
 */

export const index = '/'
export const dashboard = '/dashboard'
export const weeklyData = '/dashboard/weekly_data'
export const activity = '/activity/executing_builds'

export const projects = '/projects'
export const project = '/projects/:id'
export const projectBuilds = '/projects/:id/builds'
export const projectDependencies = '/projects/:id/dependencies'
export const projectSyncGitLab = '/projects/:id/sync_gitlab'

export const environments = '/projects/:id/environments'
export const environment = '/projects/:id/environments/:env_id'
export const environmentClone = '/projects/:id/environments/:env_id/clone'
export const environmentTemplates = '/projects/:id/environments/templates'
export const environmentConfigs = '/projects/:id/environments/:env_id/configs'
export const environmentFastlane = '/projects/:id/environments/:env_id/fastlane'
export const environmentUpdateFastfile = '/projects/:id/environments/:env_id/fastlane/update_fastfile'
export const environmentGitClone = '/projects/:id/environments/:env_id/git/clone'
export const environmentGitBranch = '/projects/:id/environments/:env_id/git/branches'
export const environmentGitTag = '/projects/:id/environments/:env_id/git/tags'
export const environmentChooseBranch = '/projects/:id/environments/:env_id/git/choose_branch'
export const environmentChooseTag = '/projects/:id/environments/:env_id/git/choose_tag'
export const environmentBuildInfo = '/projects/:id/environments/:env_id/build_info'
export const environmentBuild = '/projects/:id/environments/:env_id/build'
export const services = '/projects/:id/environments/:env_id/services'
export const service = '/projects/:id/environments/:env_id/services/:service_id'

export const build = '/projects/:id/builds/:build_id'
export const buildLog = '/projects/:id/builds/:build_id/log'
export const buildDownload = '/projects/:id/builds/:build_id/download'
export const buildMarkStatus = '/projects/:id/builds/:build_id/mark_status'

export const users = '/users'
export const currentUser = '/users/:id'
export const setPlatform = '/users/:id/set_platform/:platform'

export const login = '/account/login'
export const logout = '/account/logout'

export const fastlaneTemplates = '/fastlane_templates'
export const fastlaneTemplate = '/fastlane_templates/:id'
