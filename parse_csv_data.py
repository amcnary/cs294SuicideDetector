import pandas as pd
import datetime


def parse_load_csv_file(filename):
    df = pd.read_csv(filename)
    df.columns = [str(x) for x in df.columns]
    return df[['dttm_utc', 'value']]


def main():
    sites_to_include = [31, 767, 281, 454, 474, 386]
    ##
    # Sites were chosen because they are all located in
    # Southern California (SCE) territory, and are relatively
    # large.
    all_data = {}
    for site in sites_to_include:
        all_data[site] = parse_load_csv_file('csv/' + str(site) + '.csv')
    print all_data


if __name__ == "__main__":
    main()
