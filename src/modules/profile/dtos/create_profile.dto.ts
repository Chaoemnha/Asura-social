import { IsString } from "class-validator";

export default class CreateProfileDto {
  constructor(
    company: string,
    location: string,
    instagram: string,
    website: string,
    bio: string,
    skills: string,
    status: string,
    youtube: string,
    twitter: string,
    linkedin: string,
    facebook: string
  ) {
    this.company = company;
    this.location = location;
    this.instagram = instagram;
    this.website = website;
    this.bio = bio;
    this.skills = skills;
    this.status = status;
    this.youtube = youtube;
    this.twitter = twitter;
    this.linkedin = linkedin;
    this.facebook = facebook;
  }
  @IsString()
  company?: string;

  public location: string;
  public instagram: string;
  public website: string;
  public bio: string;
  public skills: string;
  public status: string;
  public youtube: string;
  public twitter: string;
  public linkedin: string;
  public facebook: string;
}
