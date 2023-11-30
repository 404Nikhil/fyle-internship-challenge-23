import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserRepositoryService } from './user-repository.service';
import { Repo } from '../interfaces/Repo.interface';

describe('UserRepositoryService', () => {
  let userRepositoryService: UserRepositoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepositoryService]
    });

    userRepositoryService = TestBed.inject(UserRepositoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userRepositoryService).toBeTruthy();
  });

  it('should get repositories of the user', inject(
    [HttpTestingController],
    (httpClient: HttpTestingController) => {
      const userName = 'exampleUser';
      const page = 1;
      const perPage = 10;


      const mockReposResponse: Repo[] = [
        {
          id: 1,
          node_id: 'node1',
          name: 'Repo 1',
          full_name: 'exampleUser/Repo1',
          private: false,
          owner: {
            login: 'exampleUser',
            id: 123,
            node_id: 'nodeOwner',
            avatar_url: 'https://example.com/avatar.png',
            gravatar_id: null,
            url: 'https://api.github.com/users/exampleUser',
            html_url: 'https://github.com/exampleUser',
            followers_url: 'https://api.github.com/users/exampleUser/followers',
            following_url: 'https://api.github.com/users/exampleUser/following{/other_user}',
            gists_url: 'https://api.github.com/users/exampleUser/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/exampleUser/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/exampleUser/subscriptions',
            organizations_url: 'https://api.github.com/users/exampleUser/orgs',
            repos_url: 'https://api.github.com/users/exampleUser/repos',
            events_url: 'https://api.github.com/users/exampleUser/events{/privacy}',
            received_events_url: 'https://api.github.com/users/exampleUser/received_events',
            type: 'User',
            site_admin: false,
          },
          languages: {},
          html_url: 'https://github.com/exampleUser/Repo1',
          description: 'Description for Repo 1',
          fork: false,
          url: 'https://api.github.com/repos/exampleUser/Repo1',
          forks_url: 'https://api.github.com/repos/exampleUser/Repo1/forks',
          keys_url: 'https://api.github.com/repos/exampleUser/Repo1/keys{/key_id}',
          collaborators_url: 'https://api.github.com/repos/exampleUser/Repo1/collaborators{/collaborator}',
          teams_url: 'https://api.github.com/repos/exampleUser/Repo1/teams',
          hooks_url: 'https://api.github.com/repos/exampleUser/Repo1/hooks',
          issue_events_url: 'https://api.github.com/repos/exampleUser/Repo1/issues/events{/number}',
          events_url: 'https://api.github.com/repos/exampleUser/Repo1/events',
          assignees_url: 'https://api.github.com/repos/exampleUser/Repo1/assignees{/user}',
          branches_url: 'https://api.github.com/repos/exampleUser/Repo1/branches',
          tags_url: 'https://api.github.com/repos/exampleUser/Repo1/tags',
          blobs_url: 'https://api.github.com/repos/exampleUser/Repo1/git/blobs{/sha}',
          git_tags_url: 'https://api.github.com/repos/exampleUser/Repo1/git/tags{/sha}',
          git_refs_url: 'https://api.github.com/repos/exampleUser/Repo1/git/refs{/sha}',
          trees_url: 'https://api.github.com/repos/exampleUser/Repo1/git/trees{/sha}',
          statuses_url: 'https://api.github.com/repos/exampleUser/Repo1/statuses/{sha}',
          languages_url: 'https://api.github.com/repos/exampleUser/Repo1/languages',
          stargazers_url: 'https://api.github.com/repos/exampleUser/Repo1/stargazers',
          contributors_url: 'https://api.github.com/repos/exampleUser/Repo1/contributors',
          subscribers_url: 'https://api.github.com/repos/exampleUser/Repo1/subscribers',
          subscription_url: 'https://api.github.com/repos/exampleUser/Repo1/subscription',
          commits_url: 'https://api.github.com/repos/exampleUser/Repo1/commits{/sha}',
          git_commits_url: 'https://api.github.com/repos/exampleUser/Repo1/git/commits{/sha}',
          comments_url: 'https://api.github.com/repos/exampleUser/Repo1/comments{/number}',
          issue_comment_url: 'https://api.github.com/repos/exampleUser/Repo1/issues/comments{/number}',
          contents_url: 'https://api.github.com/repos/exampleUser/Repo1/contents/{+path}',
          compare_url: 'https://api.github.com/repos/exampleUser/Repo1/compare/{base}...{head}',
          merges_url: 'https://api.github.com/repos/exampleUser/Repo1/merges',
          archive_url: 'https://api.github.com/repos/exampleUser/Repo1/{archive_format}{/ref}',
          downloads_url: 'https://api.github.com/repos/exampleUser/Repo1/downloads',
          issues_url: 'https://api.github.com/repos/exampleUser/Repo1/issues{/number}',
          pulls_url: 'https://api.github.com/repos/exampleUser/Repo1/pulls{/number}',
          milestones_url: 'https://api.github.com/repos/exampleUser/Repo1/milestones{/number}',
          notifications_url: 'https://api.github.com/repos/exampleUser/Repo1/notifications{?since,all,participating}',
          labels_url: 'https://api.github.com/repos/exampleUser/Repo1/labels{/name}',
          releases_url: 'https://api.github.com/repos/exampleUser/Repo1/releases{/id}',
          deployments_url: 'https://api.github.com/repos/exampleUser/Repo1/deployments',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          pushed_at: '2023-01-03T00:00:00Z',
          git_url: 'https://github.com/exampleUser/Repo1.git',
          ssh_url: 'git@github.com:exampleUser/Repo1.git',
          clone_url: 'https://github.com/exampleUser/Repo1.git',
          svn_url: 'https://github.com/exampleUser/Repo1',
          homepage: 'https://github.com/exampleUser/Repo1',
          size: 100,
          stargazers_count: 42,
          watchers_count: 20,
          language: 'TypeScript',
          has_issues: true,
          has_projects: false,
          has_downloads: true,
          has_wiki: false,
          has_pages: true,
          forks_count: 5,
          mirror_url: null,
          archived: false,
          disabled: false,
          open_issues: 3,
          license: {
            key: 'mit',
            name: 'MIT License',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit',
            node_id: 'MDc6TGljZW5zZTEz',
          },
          forks: 5,
          open_issues_count: 3,
          watchers: 20,
          default_branch: 'main',
          permissions: {
            admin: true,
            push: true,
            pull: true,
          },
        },
      ];




      userRepositoryService.getRepositoriesOfTheUser(userName, page, perPage).subscribe((repos) => {
        expect(repos).toEqual(mockReposResponse);
      });

      const req = httpTestingController.expectOne(`https://api.github.com/users/${userName}/repos?page=${page}&per_page=${perPage}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockReposResponse);
    }
  ));
});
