import yaml from 'js-yaml';

export function getInitials(fullName: string): string {
    const names = fullName.split(' ');
  
    const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
    const lastInitial = names[1] ? names[1].charAt(0).toUpperCase() : '';
  
    const initials = `${firstInitial}${lastInitial}`.toUpperCase();
  
    return initials;
  }

export function isEmpty(obj: Object) {
    return Object.keys(obj).length === 0;
  }

export function parseYaml(yamlString: string){
		try {
		  const jsObject = yaml.load(yamlString, { schema: yaml.JSON_SCHEMA });
		  return jsObject;
		} catch (error) {
		  console.error('Error parsing YAML:', error);
		  return null;
		}
}