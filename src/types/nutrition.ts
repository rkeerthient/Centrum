export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_nutrition {
	landingPageUrl?: string,
	name: string,
	c_benefits?: string[],
	c_nutrientsToGoal?: EntityReference[],
	c_nutrientsToFormulae?: EntityReference[],
	c_nutritionToFood?: EntityReference[],
	c_painToNutrition?: EntityReference[],
	c_sources?: string[],
	c_whatIs?: string,
	c_whyIs?: string,
	id: string,
}
