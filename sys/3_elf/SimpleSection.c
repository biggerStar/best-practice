int printf(const char* format, ...);
int global_init_var = 80; // .data
int global_init_var1;    // .bss
void func1( int i )      // .text
{
  printf("%d\n",i);       //.text
}

int main(void)           //.text
{
  static int static_var=85;  // .data
  static int static_var2;     //.bss
  int a = 1;                //.text
  int b;                    //.text
  func1(static_var + static_var2 + a + b); //.text
  return a;   //.text
}
