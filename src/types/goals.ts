export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_goals {
	name: string,
	c_goalToFormula?: EntityReference[],
	c_nutrientsToGoal: EntityReference[],
	id: string,
}
