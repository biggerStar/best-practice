```
gcc -c a.c b.c # 编译源文件,得到a.o b.o
objdump -h a.o # 查看a.o 各段的情形
objdupm -h b.o
ld a.o b.o -e main -o ab # ld连接器，-e指定入口函数，ld默认的入口为_start，-o输出
objdump -h ab # 查看链接后的情况
```

- 查看反汇编结果
- a.o中的两个引用:shard和swap，地址用0000和FFFF代替，留给链接器替换
```
objdump -d a.o  
```
- 已经被替换
```
objdump -d ab
```
 链接过程中，如何知道哪个引用需要被替换呢？每个ELF文件都有一个重定位表,例如如果在.text中有需要被重定位的地方，那么会有一个.rel.text段保存了重定位表
objdump -r a.o # 查看a.o 需要被重定向的字段

-  符号表
 每个目标文件都会有一个符号表, 当链接器需要对某个符号对引用进行重定位时，它需要确定改符号对目标地址，此时就需要去符号表中查询。
```
readelf -s a.o # 查看a.o符号表
```
## 静态库链接
静态链接库可以看成一组目标文件的集合。即很多目标文件经过压缩后形成的一个文件。例如/usr/lib/libc.a，包含了很多c语言库中的目标文件。

## 链接过程
为了了解链接过程，可以写一段小程序，不依赖任何c语言库，实现简单的hello world功能。
> * 打印功能：为了不使用c的printf静态库，需要使用系统调用来实现打印功能。
> * 修改入口函数为nomain(): 默认的入口函数为main()
> * 将所有段都合并到一个"tinytext"段上。
```
char* str = "Hello World\n";
void print(){
    asm( "mov1 $13, %%ed \n\t"
	"mov1 %0, %%ecx \n\t"
	"mov1 $0, %% ebx \n\t"
	"mov1 $4, %% eax \n\t"
	::"r"(str):"edx","ecx","ebx");
}

void exit()
{
    asm( "movl %42, %ebx \n\t"
	"movl $1,%eax \n\t"
	"int $0x80 \n\t");
}

void nomain()
{
   print();
   exit();
}

```
系统调用：
- eax为调用号，4是WRITE调用.
```
int wirte(int filedesc, char* buffer, int size);
```
- filedes表示写入文件的文件句柄，使用ebx寄存器传递，这里往终端写入，它的文件句柄是0，ebx=0
- buffer表示要写入的缓冲区地址，使用ecx寄存器传递，这里ecx=str
- size要写入的字节数，用edx传递，字节数为13

执行：
```
gcc -c -fno-builtin TinyHelloWorld.c
ld -static -e nomain -o TinyHelloWorld TinyHelloworld.o
```
- static使用静态链接，默认为动态
- -e nomain指定入口函数，默认为main

