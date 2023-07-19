export interface EntityReference {
	entityId: string,
	name: string,
}

export enum Q1Opts {
	_18_24 = "18-24",
	_25_34 = "25-34",
	_35_44 = "35-44",
	_45_54 = "45-54",
	_55_64 = "55-64",
	_65_ = "65+",
}

export enum Q2Opts {
	Male = "Male",
	Female = "Female",
	Others = "Others",
}

export interface C_q1 {
	sectionHeader?: string,
	question1?: string,
	q1Opts?: Q1Opts[],
	question2?: string,
	q2Opts?: Q2Opts[],
}

export enum QOptions {
	Energy = "Difficulty with concentration & focus",
	Sleep_Quality = "Experiencing stress",
	Stress_Management = "Have trouble falling asleep",
	Mental_Focus = "Mental Focus",
	Immunity = "Immunity",
	Metabolism = "Metabolism",
}

export interface C_q2 {
	question?: string,
	sectionHeader?: string,
	qOptions?: QOptions[],
}

export enum Q1Opts_1 {
	_7 = "<7",
	_7_9 = "7-9",
	_9 = ">9",
}

export enum Q2Opts_1 {
	Never_stressed = "Never stressed",
	Occasionally_stressed = "Occasionally stressed",
	Always_stressed = "Always stressed",
}

export enum Q3Opts {
	Little_to_no = "Little to no",
	_1___3x_weekly = "1 - 3x weekly",
	_4__weekly = "4+ weekly",
}

export interface C_q3 {
	sectionHeader?: string,
	question1?: string,
	q1Opts?: Q1Opts_1[],
	question2?: string,
	q2Opts?: Q2Opts_1[],
	question3?: string,
	q3Opts?: Q3Opts[],
}

export enum Q1Opts_2 {
	Rarely_never = "Rarely/never",
	_1___2_daily = "1 - 2 daily",
	_3__daily = "3+ daily",
}

export interface C_q4 {
	sectionHeader?: string,
	question1?: string,
	q1Opts?: Q1Opts_2[],
}

export default interface Ce_guidedSearch {
	name: string,
	c_homeToGSQuestions?: EntityReference[],
	c_q1?: C_q1[],
	c_q2?: C_q2[],
	c_q3?: C_q3[],
	c_q4?: C_q4[],
	id: string,
}
