export interface EntityReference {
	entityId: string,
	name: string,
}

export enum Q1Opt {
	_18___24 = "18 - 24",
	_25_34 = "25-34",
	_35_44 = "35-44",
	_45_54 = "45-54",
	_55_64 = "55-64",
	_65_ = "65+",
}

export enum Q2Opt {
	Male = "Male",
	Female = "Female",
	Others = "Others",
}

export interface C_q1 {
	question?: string,
	question1?: string,
	q1Opt?: Q1Opt,
	question2?: string,
	q2Opt?: Q2Opt,
}

export enum QOptions {
	Energy = "Energy",
	Sleep_Quality = "Sleep Quality",
	Stress_Management = "Stress Management",
	Mental_Focus = "Mental Focus",
	Immunity = "Immunity",
}

export interface C_q2 {
	question?: string,
	qOptions?: QOptions[],
}

export enum Q1Opts {
	_7 = "<7",
	_7_to_9 = "7 to 9",
	_9 = ">9",
}

export enum Q2Opts {
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
	q1Opts?: Q1Opts,
	question2?: string,
	q2Opts?: Q2Opts,
	question3?: string,
	q3Opts?: Q3Opts,
}

export enum Q1Options {
	Rarely_never = "Rarely/never",
	_1___2_daily = "1 - 2 daily",
	_3__daily = "3+ daily",
}

export interface C_q4 {
	sectionHeader?: string,
	question1?: string,
	q1Options?: Q1Options,
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
