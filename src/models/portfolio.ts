export interface RawSocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface RawProfile {
  name: string;
  role: string;
  location: string;
  intro: string;
  availability: string;
  email: string;
  tagline: string;
}

export interface RawSkillGroup {
  title: string;
  focus: string;
  items: string[];
}

export interface RawExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface RawProject {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  repository: string;
  demo?: string;
  status: string;
}

export interface RawGitHighlight {
  label: string;
  title: string;
  detail: string;
}

export interface RawSiteContent {
  profile: RawProfile;
  socials: RawSocialLink[];
  about: string[];
  skills: RawSkillGroup[];
  experience: RawExperienceItem[];
  projects: RawProject[];
  gitHighlights: RawGitHighlight[];
}

export class SocialLink {
  constructor(
    public readonly label: string,
    public readonly href: string,
    public readonly icon: string
  ) {}

  static fromRaw(raw: RawSocialLink) {
    return new SocialLink(raw.label, raw.href, raw.icon);
  }
}

export class Profile {
  constructor(
    public readonly name: string,
    public readonly role: string,
    public readonly location: string,
    public readonly intro: string,
    public readonly availability: string,
    public readonly email: string,
    public readonly tagline: string
  ) {}

  static fromRaw(raw: RawProfile) {
    return new Profile(
      raw.name,
      raw.role,
      raw.location,
      raw.intro,
      raw.availability,
      raw.email,
      raw.tagline
    );
  }
}

export class SkillGroup {
  constructor(
    public readonly title: string,
    public readonly focus: string,
    public readonly items: string[]
  ) {}

  static fromRaw(raw: RawSkillGroup) {
    return new SkillGroup(raw.title, raw.focus, raw.items);
  }
}

export class ExperienceItem {
  constructor(
    public readonly company: string,
    public readonly role: string,
    public readonly period: string,
    public readonly summary: string,
    public readonly achievements: string[],
    public readonly stack: string[]
  ) {}

  static fromRaw(raw: RawExperienceItem) {
    return new ExperienceItem(
      raw.company,
      raw.role,
      raw.period,
      raw.summary,
      raw.achievements,
      raw.stack
    );
  }
}

export class Project {
  constructor(
    public readonly slug: string,
    public readonly title: string,
    public readonly summary: string,
    public readonly description: string,
    public readonly stack: string[],
    public readonly highlights: string[],
    public readonly repository: string,
    public readonly demo: string | undefined,
    public readonly status: string
  ) {}

  static fromRaw(raw: RawProject) {
    return new Project(
      raw.slug,
      raw.title,
      raw.summary,
      raw.description,
      raw.stack,
      raw.highlights,
      raw.repository,
      raw.demo,
      raw.status
    );
  }
}

export class GitHighlight {
  constructor(
    public readonly label: string,
    public readonly title: string,
    public readonly detail: string
  ) {}

  static fromRaw(raw: RawGitHighlight) {
    return new GitHighlight(raw.label, raw.title, raw.detail);
  }
}

export class SiteContent {
  constructor(
    public readonly profile: Profile,
    public readonly socials: SocialLink[],
    public readonly about: string[],
    public readonly skills: SkillGroup[],
    public readonly experience: ExperienceItem[],
    public readonly projects: Project[],
    public readonly gitHighlights: GitHighlight[]
  ) {}

  static fromRaw(raw: RawSiteContent) {
    return new SiteContent(
      Profile.fromRaw(raw.profile),
      raw.socials.map(SocialLink.fromRaw),
      raw.about,
      raw.skills.map(SkillGroup.fromRaw),
      raw.experience.map(ExperienceItem.fromRaw),
      raw.projects.map(Project.fromRaw),
      raw.gitHighlights.map(GitHighlight.fromRaw)
    );
  }
}
