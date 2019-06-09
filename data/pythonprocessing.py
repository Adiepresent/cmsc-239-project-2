import pandas as pd


# read in data
merged_data = pd.read_json('cleanedgenredata.json')
merged_data = merged_data[['year_bin', 'danceability', 'energy', 'valence']]
# print(merged_data.head())


decades = merged_data['year_bin'].unique()


avgs_df = pd.DataFrame()
danceability_avgs = []
energy_avgs = []
valence_avgs = []

for decade in decades:
	danceability_avgs.append((merged_data[(merged_data['year_bin'] == decade)])['danceability'].mean())
	energy_avgs.append((merged_data[(merged_data['year_bin'] == decade)])['energy'].mean())
	valence_avgs.append((merged_data[(merged_data['year_bin'] == decade)])['valence'].mean())



avgs_df.fillna(0,inplace=True)

avgs_df['year_bin'] = decades
# print(avgs_df['year_bin'])
avgs_df['avg_danceability'] = danceability_avgs
avgs_df['avg_energy'] = energy_avgs
avgs_df['avg_valence'] = valence_avgs

# print(avgs_df.head())

Export  = avgs_df.to_json('averages.json', orient='records')
