import argparse
import pikepdf
import os

def main():
    parser = argparse.ArgumentParser(description='Encrypt a PDF file with a password and disable extraction.')
    parser.add_argument('file', type=str, help='The PDF file to be encrypted')
    parser.add_argument('password', type=str, help='The password to encrypt the PDF with')
    args = parser.parse_args()
    print(args)
    file_path = os.path.join('/root/OneDoc/server/data/pdf', args.file)

    try:
        with pikepdf.Pdf.open(file_path, allow_overwriting_input=True) as old_pdf:
            no_extr = pikepdf.Permissions(extract=False)
            old_pdf.save(file_path, encryption=pikepdf.Encryption(user=args.password, owner=args.password, allow=no_extr))
        print(args.file)
    except Exception as e:
        print(f'An error occurred: {e}')

if __name__ == '__main__':
    main()
