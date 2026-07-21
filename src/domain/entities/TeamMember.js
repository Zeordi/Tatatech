/**
 * @typedef {Object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {string} title
 * @property {string} photo
 * @property {string} [credentials]
 * @property {string} [linkedin]
 * @property {boolean} [isFounder]
 */

export function createTeamMember(data) {
  return {
    id: data.id,
    name: data.name,
    title: data.title,
    photo: data.photo,
    credentials: data.credentials ?? '',
    linkedin: data.linkedin ?? '',
    isFounder: data.isFounder ?? false,
  };
}
