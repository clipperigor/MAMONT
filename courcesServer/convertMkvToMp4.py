import os
import subprocess
PDIR='/media/sf_work/tmp'

if __name__=='__main__':
    for name in os.listdir(PDIR):
        fin=PDIR+os.sep+name
        fout=fin[:-4]+'.mp4'
        with open(fin, 'rb') as f:
            fs = os.fstat(f.fileno())
            # Имя файла и его размер
            print(fin,str(fs.st_size))
            # Конвертируеи mkv в mp3 и из каждого файла вырезаем по 100 сек видео
            out = subprocess.Popen(['ffmpeg', '-i', fin, '-vcodec','mpeg4', '-acodec', 'ac3', '-ar', '48000',
                                    '-ab', '192k', '-y' ,'-t', '100',  fout ],
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT)
            stdout, stderr = out.communicate()
            if stderr:
                print('Ощибка')
            else:
                print('Выполнено!!!', fout, stdout)
            # print(stdout, stderr)
            # print(file[-4:])