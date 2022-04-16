import glob
import pandas as pd

path = "csv"
files = glob.glob(path + "/*.csv")

data_frame = pd.DataFrame()
content = []

for filename in files: 
    df = pd.read_csv(filename, index_col=None)

    filename=filename.replace('csv/','')
    filename=filename.replace('.csv','')

    content.append(filename+"\t"+ str(len(df)))


with open('data.csv', 'w') as out:
    for s in content:
        out.write(s+'\n')