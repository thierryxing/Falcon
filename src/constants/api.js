/**
 * Created by Thierry on 2017/4/14.
 */

export const projects = '/projects'
export const project = '/projects/:id'
export const projectBuilds = '/projects/:id/builds'
export const projectDependencies = '/projects/:id/dependencies'
export const projectSyncGitLab = '/projects/:id/sync_gitlab'

export const environments = '/projects/:id/environments'
export const environment = '/projects/:id/environments/:env_id'
export const environmentTemplates = '/projects/:id/environments/templates'
export const environmentConfigs = '/projects/:id/environments/:env_id/configs'
export const environmentFastlane = '/projects/:id/environments/:env_id/fastlane'
export const environmentGitClone = '/projects/:id/environments/:env_id/git_clone'
export const environmentGitBranch = '/projects/:id/environments/:env_id/git_branch'
export const environmentChooseBranch = '/projects/:id/environments/:env_id/choose_branch'
export const buildLib = '/projects/:id/environments/:env_id/build_lib'
export const latestGitLog = '/projects/:id/environments/:env_id/latest_git_log'

export const services = '/projects/:id/services'

export const users = '/users'
export const currentUser = '/users/:id'
export const setPlatform = '/users/:id/set_platform/:platform'

export const login = '/account/login'
export const logout = '/account/logout'
